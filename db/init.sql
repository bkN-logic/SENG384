-- UUID kullanabilmek için gerekli eklentiyi kuruyoruz
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- people tablosunu oluşturuyoruz
CREATE TABLE IF NOT EXISTS people (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);