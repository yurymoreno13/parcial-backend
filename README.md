# Backend (API)
- `cp .env.example .env` y ajusta variables
- `npm i`
- (opcional) `npm run seed`
- `npm run dev`

**Endpoints**
- `POST /api/auth/register {name,email,password}`
- `POST /api/auth/login {email,password}` -> `{token,role,name}`
- `GET  /api/products` (público, solo activos)
- `GET  /api/products/all` (admin)
- `POST /api/products` (admin)
- `PATCH /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `POST /api/orders` (usuario con token) body: `{items:[{product,qty}]}`
- `GET  /api/orders/mine` (usuario)
- `GET  /api/orders` (admin)
