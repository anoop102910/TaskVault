"use client";
import React, { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { User } from "@/index";
import { useTeamMembers } from "@/lib/services/user";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { ConfirmationAlert, DeleteAlert } from "@/components/ui/alert-dialog";
import api from "@/lib/api";
import TableSkeleton from "../../../components/shared/TableSkeleton";
import Error from "@/components/shared/Error";

export default function TeamTable() {
  const { users, isLoading, error, mutate } = useTeamMembers({});
  const [open, setOpen] = useState<boolean>(false);

  if (error) return <Error message={error.message} />;
  if (isLoading) return <TableSkeleton cols={3} rows={10} />;
  if (!users) return <NoTeamMembers />;

  const removeMember = async (memberId: string) => {
    try {
      await api.post("/team/remove-member", { memberId });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { name: "Name", key: "name" },
    { name: "Email", key: "email" },
    {
      name: "Actions",
      key: "actions",
      render: (user: User) => (
        <div>
          <Button variant="ghost" size="icon">
            <DeleteAlert
              title="Are you sure?"
              desc="This action cannot be undone."
              trigger={<TrashIcon color="red" />}
              onDelete={() => {
                removeMember(user._id);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              pending={false}
              open={open}
              setOpen={setOpen}
            />
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable data={users} columns={columns} caption="Team List" />;
}
const NoTeamMembers = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-lg font-semibold">No team members found</div>
      <div className="text-sm text-gray-500">Add a member to the team</div>
    </div>
  );
};
