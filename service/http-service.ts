import Logger from '@/utils/logger';
import axios, { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
const TAG = 'HttpService';

export interface HttpServiceInterface{
   get<T>(endpoint: string, headers?: AxiosHeaders): Promise<T>
   post<T>(endpoint: string, data: any, headers?: AxiosHeaders): Promise<T>
   put<T>(endpoint: string, data: any, headers?: AxiosHeaders): Promise<T>
   delete<T>(endpoint: string, headers?: AxiosHeaders): Promise<T>
}

export class HttpService implements HttpServiceInterface{
   private axiosInstance: AxiosInstance;
   constructor(baseUrl: string) {
      this.axiosInstance = axios.create({
         baseURL: baseUrl,
         headers: {
            'Content-Type': 'application/json',
         },
         timeout: 10000,
      });

      Logger.info(TAG, `Axios instance created with base URL: ${baseUrl}`);
   }

   private async request<T>(
      endpoint: string,
      method: HttpMethod,
      data: any = null,
      headers: AxiosHeaders | undefined
   ): Promise<T> {
      const url = `${this.axiosInstance.defaults.baseURL}${endpoint}`;

      const config: AxiosRequestConfig = {
         url: endpoint,
         method: method,
         headers: headers,
         data: data,
      };

      Logger.info(TAG, `[${method}] Requesting: ${url}`);

      try {
         const response: AxiosResponse<T> = await this.axiosInstance.request<T>(config);
         Logger.success(TAG, `[${method}] Request succeeded (${response.status} ${response.statusText}): ${url}`);
         return response.data;

      } catch (error) {
         const axiosError = error as AxiosError;
         if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data || axiosError.message;
            Logger.error(TAG, `[${method}] Request failed (${status} ${axiosError.response.statusText}): ${url}`, message);
            throw new Error(`HTTP Error ${status}: ${JSON.stringify(message)}`);
         } else if (axiosError.request) {
            Logger.error(TAG, `[${method}] No response received for ${url}.`, axiosError.message);
            throw new Error(`Network Error: ${axiosError.message}`);
         } else {
            Logger.error(TAG, `[${method}] Request setup error for ${url}:`, axiosError.message);
            throw new Error(`Client Error: ${axiosError.message}`);
         }
      }
   }

   public get<T>(endpoint: string, headers?: AxiosHeaders): Promise<T> {
      return this.request<T>(endpoint, 'GET', null, headers);
   }

   public post<T>(endpoint: string, data: any, headers?: AxiosHeaders): Promise<T> {
      return this.request<T>(endpoint, 'POST', data, headers);
   }

   public put<T>(endpoint: string, data: any, headers?: AxiosHeaders): Promise<T> {
      return this.request<T>(endpoint, 'PUT', data, headers);
   }

   public delete<T>(endpoint: string, headers?: AxiosHeaders): Promise<T> {
      return this.request<T>(endpoint, 'DELETE', null, headers);
   }
}