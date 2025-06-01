import { container } from "@infrastructure/injection/container";

export const resolveController = <T>(identifier: symbol): T => {
    return container.get<T>(identifier);
};
