// import { faker } from "@faker-js/faker";
// import { Task } from "./index";
// import { TASK_PRIORITY, TASK_STATUS, PROJECT_STATUS } from "./constant";
// import { User, Team, Project } from "./index";

// export const fakeTask = (): Task[] => {
//   return Array.from({ length: faker.number.int({ min: 20, max: 40 }) }, () => ({
//     _id: faker.string.uuid(),
//     project: faker.string.uuid(),
//     assignee: faker.string.uuid(),
//     assignedTo: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({
//       _id: faker.string.uuid(),
//       name: faker.person.fullName(),
//       avatar: faker.image.avatar(),
//       email: faker.internet.email(),
//     })),
//     title: faker.lorem.sentence().slice(0, 20),
//     desc: faker.lorem.paragraph().slice(0, 50),
//     priority: faker.helpers.arrayElement(Object.values(TASK_PRIORITY)),
//     status: faker.helpers.arrayElement(Object.values(TASK_STATUS)),
//     progress: faker.number.int({ min: 0, max: 100 }),
//     subTasks: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({
//       _id: faker.string.uuid(),
//       title: faker.lorem.sentence().slice(0, 10),
//       desc: faker.lorem.paragraph().slice(0, 50),
//       priority: faker.helpers.arrayElement(Object.values(TASK_PRIORITY)),
//       status: faker.helpers.arrayElement(Object.values(TASK_STATUS)),
//       progress: faker.number.int({ min: 0, max: 100 }),
//     })),
//     dueDate: faker.date.future(),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.recent(),
//   }));
// };

// export const fakerUsers = (): User[] => {
//   return Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => ({
//     _id: faker.string.uuid(),
//     name: faker.person.fullName(),
//     avatar: faker.image.avatar(),
//     email: faker.internet.email(),
//   }));
// };

// export const fakerTeamMembers = (): User[] => {
//   return Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => ({
//     _id: faker.string.uuid(),
//     name: faker.person.fullName(),
//     avatar: faker.image.avatar(),
//     email: faker.internet.email(),
//   }));
// };

// export const fakerProjectMembers = (): User[] => {
//   return Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => ({
//     _id: faker.string.uuid(),
//     name: faker.person.fullName(),
//     avatar: faker.image.avatar(),
//     email: faker.internet.email(),
//   }));
// };

// export const fakerTeam = (): Team[] => {
//   return Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => ({
//     _id: faker.string.uuid(),
//     name: faker.company.name(),
//     members: fakerTeamMembers(),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.recent(),
//   }));
// };

// export const fakerProject = (): Project[] => {
//   return Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => ({
//     _id: faker.string.uuid(),
//     title: faker.company.name(),
//     desc: faker.lorem.paragraph().slice(0, 50),
//     status: faker.helpers.arrayElement(Object.values(PROJECT_STATUS)),
//     members: fakerProjectMembers(),
//     progress: faker.number.int({ min: 0, max: 100 }),
//     createdAt: faker.date.past(),
//     updatedAt: faker.date.recent(),
//     dueDate: faker.date.future(),
//   }));
// };
