"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// prisma/seed.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seed() {
    const tags = [
        "การบริการ", "ราคา", "การเปรียบเทียบ", "การจ่ายเงิน",
        "การเคลมประกัน", "โปรโมชั่น", "ตอบแชทไว",
        "ใช้ง่าย", "คำแนะนำ", "การผ่อนชำระ"
    ];
    await Promise.all(tags.map((name) => prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
    })));
    console.log("✅ Tags seeded");
}
seed()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
