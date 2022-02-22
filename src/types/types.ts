import { Dispatch, SetStateAction } from "react";

export interface UserData {
    id?: number;
    role?: string;
    active?: boolean;
    name: string;
    email: string;
    password?: string;
}

export interface UserData {
    passwordConfirm?: string;
}

export interface AnalysisData {
    id?: number;
    name: string;
    path: string;
    image: boolean;
    video: boolean;
    porn_threshold: number;
    face_threshold: number;
    child_threshold: number;
    age_threshold: number;
    log?: string;
    status?: string;
    createdAt?: string;
}

export interface AnalysisReportData {
    id: number;
    file: string;
    hash: string;
    nsfw: string;
    faces: number;
    ages: string;
    children: number;
    classification: string;
}

export interface DirData {
    path: string;
    contents: string[];
}

export interface GlobalStateInterface {
    currentUser: UserData | null | undefined,
    setCurrentUser: Dispatch<SetStateAction<UserData | null | undefined>>
    isSidebarClosed: boolean,
    setIsSidebarClosed: Dispatch<SetStateAction<boolean>>

}
