/*
  Warnings:

  - A unique constraint covering the columns `[barbeiroId,data,hora]` on the table `Agendamento` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clienteNome` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_servicoId_fkey";

-- AlterTable
ALTER TABLE "Agendamento" ADD COLUMN     "clienteNome" TEXT NOT NULL,
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hora" TEXT NOT NULL,
ALTER COLUMN "clienteId" DROP NOT NULL,
ALTER COLUMN "servicoId" DROP NOT NULL,
ALTER COLUMN "dataAgendamento" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_barbeiroId_data_hora_key" ON "Agendamento"("barbeiroId", "data", "hora");

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;
