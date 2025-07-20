const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.User.findUnique({
      where: { id: userId },
      select: {
        id: true,
        mobile: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports = { getUserProfile };
