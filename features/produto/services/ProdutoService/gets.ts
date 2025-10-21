import type { AxiosInstance } from "axios";
import type { Produto } from "@/features/produto/interfaces/Produto";

export default function (get: AxiosInstance["get"]) {
  return {
    async getProdutos() {
      const response = await get<Produto[]>("/");
      return response;
    },
    async getProduto(data: { id: number }) {
      const { id } = data;
      const response = await get<Produto[]>(`/${id}`);
      return response;
    },
  };
}
