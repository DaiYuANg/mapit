import { createContext, ReactNode, useState } from 'react';

interface ProjectContextType {
  projectId: string | null;
  setProjectId: (id: string) => void;
}

// 创建默认值
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
  initialProjectId?: string | null;
}

// Provider 组件
export const ProjectProvider = ({ children, initialProjectId = null }: ProjectProviderProps) => {
  const [projectId, setProjectId] = useState<string | null>(initialProjectId);

  return <ProjectContext.Provider value={{ projectId, setProjectId }}>{children}</ProjectContext.Provider>;
};
export { ProjectContext };
export type { ProjectContextType };
