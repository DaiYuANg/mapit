// Hook：用于消费 context
import { useContext } from 'react';
import { ProjectContextType, ProjectContext } from './project.context';

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
