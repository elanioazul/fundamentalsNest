import { registerAs } from "@nestjs/config";

export default registerAs('coffees-config', () => ({ // 👈
    foo: 'bar'
  }));