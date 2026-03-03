import Logger from "@/utils/logger";


/**
 * Retorna um objeto de logging pré-configurado com a tag do componente.
 * @param componentName O nome do componente/módulo (ex: 'UserProfileScreen').
 */
export const useLogger = (componentName: string) => {
    return {
        info: (message: any, ...optionalParams: any[]) => 
            Logger.info(componentName, message, ...optionalParams),
        warn: (message: any, ...optionalParams: any[]) => 
            Logger.warn(componentName, message, ...optionalParams),
        error: (message: any, ...optionalParams: any[]) => 
            Logger.error(componentName, message, ...optionalParams),
        success: (message: any, ...optionalParams: any[]) => 
            Logger.success(componentName, message, ...optionalParams),
    };
};