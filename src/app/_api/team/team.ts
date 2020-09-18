export interface TeamDepartment {
  id: string;
  name: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  github_id: number;
  department_id: string;
  joined: number;
}
