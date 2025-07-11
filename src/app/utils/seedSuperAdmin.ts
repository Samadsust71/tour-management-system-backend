/* eslint-disable no-console */
import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";
export const seedSuperAdmin = async () => {
    const isSuperAdminExists = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });

    if (isSuperAdminExists) {
        console.log("Super Admin already exists");
        return;
    }

    console.log("Seeding Super Admin...");
    const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, parseInt(envVars.SALT_VALUE));

    const authProvider :IAuthProvider = {
        provider:"credentials",
        providerId: envVars.SUPER_ADMIN_EMAIL,
    }

    const payload: IUser= {
        name: "Super Admin",
        email: envVars.SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
        auths:[authProvider],
        isVerified:true,

    }
    const superAdmin = await User.create(payload);
    console.log(`Super Admin created with ID: ${superAdmin._id}`);
}