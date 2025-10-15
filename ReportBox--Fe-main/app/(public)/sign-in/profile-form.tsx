import UserForm from "@/components/profile/UserForm";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
export default function ProfileFormScreen() {
	const { data } = useAuth();
	return <UserForm onlyForm={true} editable={false} id={data?.userID} />;
}
