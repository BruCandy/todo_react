import axios from "axios";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";
import { TodoType } from "../types/api/todo";

export const useAllTodos = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Array<TodoType>>([]);

  const getTodos = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<TodoType>>("http://localhost:3001/todos")
      .then((res) => setTodos(res.data))
      .catch(() => {
        showMessage({ title: "ユーザー取得に失敗しました。", status: "error" });
      })
      .finally(() => setLoading(false));
  }, []);
  return { getTodos, todos, loading };
};
