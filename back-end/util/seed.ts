import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.eventInfo.deleteMany();
    await prisma.event.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    const fullstack = await prisma.event.create({
        data: {
          title: "Full-stack development",
          description: "Learn how to build a full stack web application.",
          eventInfos: {
            create: [
              { category: "Web applications", location: "Leuven" },
              { category: "Full stack basics", location: "Online" },
            ],
          },
        },
        include: { eventInfos: true },
      });

      const databaseBasics = await prisma.event.create({
        data: {
          title: "Database Basics",
          description: "Learn the basics of a functioning database.",
          eventInfos: {
            create: [
              { category: "Databases", location: "Brussels" },
              { category: "SQL Essentials", location: "Online" },
            ],
          },
        },
        include: { eventInfos: true },
      });

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            role: 'admin',
            profile: {
                create: {
                    firstName: "Robin",
                    lastName: "De Koninck",
                    email: "r0804949@ucll.be",
                    gender: "M",
                },
            },
        },
        
    });

    const guest = await prisma.user.create({
        data: {
            username: 'guest',
            password: await bcrypt.hash('guest123', 12),
            role: 'guest',
            profile: {
                create: {
                    firstName: "gue",
                    lastName: "st",
                    email: "guest@ucll.be",
                    gender: "V",
                },
            },
        },
    });

    const participant1 = await prisma.participant.create({
      data: {
          user: {
              create: {
                  username: 'participant',
                  password: await bcrypt.hash('participant123', 12),
                  role: 'participant'
              },
          },
          events: {
              connect: [{ id: fullstack.id }, { id: databaseBasics.id }],
          },
      },
  });
    
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
