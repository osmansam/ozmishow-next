import { ContainerType, PageData, PageOptionsType } from "@/types";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "https://ozmishow-back.onrender.com/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any authentication tokens here if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
      },
    );
  }

  /**
   * Fetch page options (site configuration)
   */
  async getPageOptions(): Promise<PageOptionsType[]> {
    const response = await this.client.get("/pageOptions");
    return response.data.pageOptions || response.data;
  }

  /**
   * Fetch containers/components for a specific page
   */
  async getPageContainers(
    page: string,
    language: string = "en",
  ): Promise<ContainerType[]> {
    const response = await this.client.get(`/twoPicture/${page}`);
    return response.data.data || response.data;
  }

  /**
   * Fetch complete page data (options + containers)
   * This is optimized for SSR - single request
   */
  async getPageData(page: string, language: string = "en"): Promise<PageData> {
    try {
      console.log(`[API] Fetching page data for: ${page}`);

      // Step 1: Fetch page options first to get the correct page name
      const optionsResponse = await this.client.get("/pageOptions");
      console.log("[API] Options response:", optionsResponse.data);

      const allPageOptions =
        optionsResponse.data.pageOptions || optionsResponse.data;
      console.log("[API] Parsed page options:", allPageOptions);

      // Step 2: Find the matching page options (case-insensitive search)
      const pageOptions =
        allPageOptions.find(
          (p: any) =>
            p.pageNameEN?.toLowerCase() === page.toLowerCase() ||
            p.pageNameTR?.toLowerCase() === page.toLowerCase(),
        ) || allPageOptions[0];

      console.log("[API] Selected page options:", pageOptions);

      // Step 3: Use the actual pageNameEN from backend to fetch containers
      const correctPageName = pageOptions.pageNameEN || page;
      console.log(
        `[API] Using correct page name for containers: ${correctPageName}`,
      );

      // Step 4: Fetch containers with the correct case-sensitive name
      const containersResponse = await this.client.get(
        `/twoPicture/${correctPageName}`,
      );
      console.log("[API] Containers response:", containersResponse.data);

      const containers =
        containersResponse.data.data || containersResponse.data;
      console.log("[API] Parsed containers:", containers);

      console.log(
        "[API] Final containers count:",
        Array.isArray(containers) ? containers.length : 0,
      );

      return {
        pageOptions,
        containers: Array.isArray(containers) ? containers : [],
      };
    } catch (error) {
      console.error(`[API] Error fetching page data for ${page}:`, error);
      throw error;
    }
  }

  /**
   * Fetch all pages for sitemap generation
   */
  async getAllPages(): Promise<PageOptionsType[]> {
    const response = await this.client.get("/pageOptions");
    return response.data.pageOptions || response.data;
  }

  /**
   * Generic GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Named exports for convenience
export const getPageOptions = () => apiClient.getPageOptions();
export const getPageContainers = (page: string, language?: string) =>
  apiClient.getPageContainers(page, language);
export const getPageData = (page: string, language?: string) =>
  apiClient.getPageData(page, language);
export const getAllPages = () => apiClient.getAllPages();
