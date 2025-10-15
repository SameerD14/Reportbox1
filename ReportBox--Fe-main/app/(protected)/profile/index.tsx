import UserForm from "@/components/profile/UserForm";
import React from "react";

export default function ProfileFormScreen({ editable = true }) {
	return <UserForm onlyForm={false} editable={true} />;
}
