// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  const tags = [
    "การบริการ","ราคา","การเปรียบเทียบ","การจ่ายเงิน",
    "การเคลมประกัน","โปรโมชั่น","ตอบแชทไว",
    "ใช้ง่าย","คำแนะนำ","การผ่อนชำระ"
  ];

  await Promise.all(
    tags.map((name) =>
      prisma.tag.upsert({
        where:  { name },
        update: {},
        create: { name },
      })
    )
  );

  console.log("✅ Tags seeded");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
