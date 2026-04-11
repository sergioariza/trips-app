const authService = require("../services/auth.service");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const user = await authService.register(
      req.body.email,
      req.body.password
    );

    res.json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await authService.login(
      req.body.email,
      req.body.password
    );

    const token = generateToken(user);

    res.json({
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  if (req.user.id !== Number(req.params.id)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await authService.deleteUser(Number(req.params.id));
  res.json({ message: "User deleted" });
};

module.exports = { register, login, deleteUser };
