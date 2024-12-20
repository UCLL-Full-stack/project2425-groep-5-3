import { User } from "@/types";
import React from "react";

type Props = {
    users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
    return (
        <>
            {users && users.length > 0 ? (
                <table className="table table-striped table-hover border rounded shadow-sm bg-white" style={{ maxWidth: "600px" }}>
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-muted">No users available.</p>
            )}
        </>
    );
};

export default UserOverviewTable;