
export const generateValidYearInterval = () =>{
   const currentYear = new Date().getFullYear();
   const startYear = 2000;
   if (currentYear < startYear) {
      return [];
   }
   const years: number[] = [];
   for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
   }
   return years;
}