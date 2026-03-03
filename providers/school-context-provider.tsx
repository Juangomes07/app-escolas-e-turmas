import { CreateSchoolPayload, EditSchoolPayload, SchoolModel } from '@/models/school';
import { useSchools } from '@/modules/School/hooks/useSchools';
import React, { ReactNode } from 'react';

interface SchoolProviderProps {
   children: ReactNode;
}

export interface SchoolContextData {
   schoolList: SchoolModel[];
   isLoading: boolean;
   loadSchools: () => Promise<void>;
   createSchool: (data: CreateSchoolPayload) => Promise<void>;
   editSchool: (data: EditSchoolPayload) => Promise<void>;
   deleteSchool: () => Promise<void>;
   handleSelectSchool: (school: SchoolModel) => void;
   handleCleanSelectSchool: () => void;
   schoolSelected: SchoolModel | null;
   setSearchTerm: (term:string) => void
}

const SchoolContext = React.createContext<SchoolContextData | undefined>(undefined);

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ children }) => {
   const schoolsLogic = useSchools();

   const contextValue: SchoolContextData = {
      schoolList: schoolsLogic.schoolList,
      isLoading: schoolsLogic.isLoading,
      loadSchools: schoolsLogic.loadSchools,
      createSchool: schoolsLogic.createSchool,
      deleteSchool: schoolsLogic.deleteSchool,
      handleSelectSchool: schoolsLogic.handleSelectSchool,
      handleCleanSelectSchool: schoolsLogic.handleCleanSelectSchool,
      schoolSelected: schoolsLogic.schoolSelected,
      editSchool:schoolsLogic.editSchool,
      setSearchTerm:schoolsLogic.setSearchTerm
   };

   return (
      <SchoolContext.Provider value={contextValue}>
         {children}
      </SchoolContext.Provider>
   );
};

export function useSchoolContext(): SchoolContextData {
   const context = React.useContext(SchoolContext);

   if (context === undefined) {
      throw new Error('useSchoolContext must be used within a SchoolProvider');
   }

   return context;
}