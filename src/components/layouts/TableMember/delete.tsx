import { GETAPIURL } from "@/helper/getEnv";
import { MemberTypeZod } from "@/schema/zodSchema";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function DeleteMemberCell({member}: {member: MemberTypeZod}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
 
  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [success]);

  const handleDelete = async (name: string, description: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name} because ${description}?`
      )
    ) {
      try {
        setLoading(true);
        const response = await fetch(`${GETAPIURL()}/data-member/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: name.split(" ").join("-"),
            description,
          }),
        });

        if (response.ok) {
          setLoading(false);
          setSuccess(true);
          window.location.reload();
        } else {
          setLoading(false);
          throw new Error("Failed to delete member");
        }
      } catch (error: any) {
        setLoading(false);
        setError(error);
        console.error(error);
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="text-xl text-red-500 cursor-pointer hover:text-red-900 duration-100"
          >
            <span className="sr-only">Open menu</span>
            <IoIosRemoveCircle />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-custom-gray border-zinc-600 font-urbanist"
          align="start"
        >
          <DropdownMenuLabel className="text-zinc-200">
            Tandai dengan
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => handleDelete(member.nama, "graduated")}
            className="text-zinc-200"
          >
            Graduated
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(member.nama, "resigned")}
            className="text-zinc-200"
          >
            Resigned
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(member.nama, "laid off")}
            className="text-zinc-200"
          >
            Laid Off
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(member.nama, "fired")}
            className="text-zinc-200"
          >
            Fired
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-custom-green to-blue-500 p-0.5 rounded-xl ${
          success ? "top-20 opacity-100" : "top-10 opacity-0"
        } transition-all duration-300`}
      >
        <div className="bg-gradient-to-br from-white via-zinc-200 to-white text-sm py-3 px-6 font-urbanist text-custom-gray rounded-xl flex gap-3 items-center">
          <div className="text-emerald-500 text-xl">
            <IoCheckmarkCircle />
          </div>
          <h1>Data member berhasil dihapus.</h1>
        </div>
      </div>
    </>
  );
}
