import { ClassesModel, CreateClassesPayload, EditClassesPayload } from '@/models/classes';
import { useClasses } from '@/modules/Classes/hooks/useClasses';
import React, { ReactNode } from 'react';

interface ClassProviderProps {
   children: ReactNode;
}

export interface ClassesContextData {
   classesList: ClassesModel[];
   isLoading: boolean;
   loadClasses: (filters?:{schoolId?:string}) => Promise<void>;
   deleteClass: () => Promise<void>;
   handleSelectClass: (classSelect:ClassesModel) => void;
   handleCleanSelectClass: () => void;
   classSelected: ClassesModel | null
   createClass: (data: CreateClassesPayload) => Promise<void>
   editClass: (data: EditClassesPayload) => Promise<void>
   setSearchTerm: (term:string) => void

}

const ClassContext = React.createContext<ClassesContextData | undefined>(undefined);

export const ClassProvider: React.FC<ClassProviderProps> = ({ children }) => {
   const classesLogic = useClasses();

   const contextValue: ClassesContextData = {
      classesList: classesLogic.classesList,
      isLoading: classesLogic.isLoading,
      loadClasses: classesLogic.loadClasses,
      deleteClass: classesLogic.deleteClass,
      handleSelectClass: classesLogic.handleSelectClass,
      handleCleanSelectClass: classesLogic.handleCleanSelectClass,
      classSelected: classesLogic.classSelected,
      createClass:classesLogic.createClass,
      editClass:classesLogic.editClass,
      setSearchTerm:classesLogic.setSearchTerm
   };

   return (
      <ClassContext.Provider value={contextValue}>
         {children}
      </ClassContext.Provider>
   );
};

export function useClassContext(): ClassesContextData {
   const context = React.useContext(ClassContext);

   if (context === undefined) {
      throw new Error('useClassContext must be used within a SchoolProvider');
   }

   return context;
}