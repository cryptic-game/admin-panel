export interface TeamDepartment {
  id: string;
  name: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  githubId: number;
  departmentId: string;
  joined: string;
}
