import { Pool, PoolConfig } from 'pg';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// ==============================================
// CONFIGURAÇÃO PARA POSTGRES LOCAL (Docker/Compose)
// ==============================================
// Use esta seção para desenvolvimento local com Docker Compose
const localPoolConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // Para desenvolvimento local, connectionTimeoutMillis pode ser menor
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20, // Conexões máximas no pool
  // SSL não é necessário para localhost
  ssl: false
};

// ==============================================
// CONFIGURAÇÃO PARA NEON (Cloud PostgreSQL)
// ==============================================
// Use esta seção para produção/staging com Neon
const neonPoolConfig: PoolConfig = {
  // Usando connection string do Neon (disponível no dashboard)
  connectionString: process.env.NEON_DATABASE_URL,
  // Neon requer SSL
  ssl: {
    rejectUnauthorized: false
  },
  // Configurações otimizadas para cloud
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 60000,
  max: 50, // Neon permite mais conexões simultâneas
  // Keep-alive para conexões persistentes
  keepAlive: true
};


/* =======================
   MONGODB
======================= */

export const connectMongo = async (): Promise<void> => {
  try {
    const mongoURL = process.env.MONGO_URL as string;

    await mongoose.connect(mongoURL);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
};

/* =======================
   EXPORTS
======================= */

export const testPgConnection = async () => {
  const result = await pool.query('SELECT NOW()');
  return result.rows[0];
};

// ==============================================
// ESCOLHA A CONFIGURAÇÃO DESEJADA
// ==============================================

// OPÇÃO 1: Para PostgreSQL local (comente a linha abaixo para usar Neon)
// const poolConfig = localPoolConfig;

// OPÇÃO 2: Para Neon (descomente a linha abaixo e comente a de cima)
const poolConfig = neonPoolConfig;

// ==============================================
// VALIDAÇÃO DAS VARIÁVEIS DE AMBIENTE
// ==============================================

if (!poolConfig.connectionString) {
  // Validação para configuração local
  const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.warn(`⚠️ Variável de ambiente faltando: ${envVar}`);
      // Não lançamos erro para permitir testes offline
    }
  }
}

// ==============================================
// CRIAÇÃO DO POOL DE CONEXÕES
// ==============================================

const pool = new Pool(poolConfig);

// Event listeners para monitoramento
pool.on('connect', () => {
  console.log(`✅ Pool de conexões estabelecido com ${poolConfig.host ? 'PostgreSQL local' : 'Neon'}`);
});

pool.on('error', (err: Error) => {
  console.error('❌ Erro no pool de conexões:', err.message);
  // Não sair do processo em produção, apenas logar o erro
  if (process.env.NODE_ENV === 'development') {
    process.exit(-1);
  }
});

// ==============================================
// FUNÇÕES ÚTEIS
// ==============================================

// Testa a conexão (útil para health checks)
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as version');
    client.release();
    
    console.log(`✅ Conexão testada com sucesso - ${result.rows[0].current_time}`);
    return {
      success: true,
      timestamp: result.rows[0].current_time,
      version: result.rows[0].version,
      provider: poolConfig.host ? 'PostgreSQL local' : 'Neon'
    };
  } catch (error) {
    console.error('❌ Falha ao testar conexão:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      provider: poolConfig.host ? 'PostgreSQL local' : 'Neon'
    };
  }
};

// Fecha todas as conexões (útil para shutdown)
export const closePool = async () => {
  try {
    await pool.end();
    console.log('✅ Pool de conexões fechado');
  } catch (error) {
    console.error('❌ Erro ao fechar pool:', error);
  }
};

export default pool;




/** exemplo de uso:
 * // No seu app.ts
import pool, { testConnection } from './config/db';

// Health check endpoint
app.get('/health/db', async (req, res) => {
  const dbStatus = await testConnection();
  res.json(dbStatus);
});

// No shutdown
process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});
 */