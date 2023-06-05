const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 40],
            msg: "name must be between 2 and 40 characters",
          },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 40],
            msg: "last_name must be between 2 and 40 characters",
          },
        },
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 40],
            msg: "user_name must be between 2 and 40 characters",
          },
          noSpaces(value) {
            if (/\s/.test(value)) {
              throw new Error("user_name cannot contain spaces");
            }
          },
        },
      },
      image: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Invalid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 40],
            msg: "password must be between 6 and 40 characters",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 40],
            msg: "phone must be between 2 and 40 characters",
          },
        },
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdInBd: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          user.email = user.email.toLowerCase();
          user.user_name = user.user_name.toLowerCase();
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        },
      },
    }
  );

  User.login = async (user_name, password) => {
    const user = await User.findOne({ where: { user_name: user_name.toLowerCase() } });
  
    if (!user) {
      throw new Error("Invalid user_name");
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
  
    return user;
  };

  return User;
};
