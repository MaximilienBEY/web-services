import { PrismaClient } from "@prisma/client"
import Elysia from "elysia"

const prismaPlugin = new Elysia().state("db", new PrismaClient())

export default prismaPlugin
