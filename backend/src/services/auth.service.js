const prisma = require("@prisma/client").PrismaClient;
const bcrypt = require("bcrypt");

const db = new prisma();

const register = async (email, password) => {
  const hashed = await bcrypt.hash(password, 10);

  return db.user.create({
    data: { email, password: hashed }
  });
};

const login = async (email, password) => {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  return user;
};

const deleteUser = async (id) => {
  return db.user.delete({ where: { id } });
};

module.exports = { register, login, deleteUser };
