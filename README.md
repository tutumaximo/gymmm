# 🏋️ Gym Private Tracker

> Seu diário de treino pessoal — 100% estático, sem backend, sem login.

---

## 📋 Descrição

**Gym Private Tracker** é um aplicativo web estático para acompanhar seus treinos na academia. Desenvolvido com HTML, CSS e JavaScript puros — sem frameworks, sem dependências externas, sem servidor. O progresso é salvo automaticamente no navegador via `localStorage`.

Ideal para uso pessoal, hospedado de forma gratuita no GitHub Pages.

---

## ⚙️ Tecnologias

| Tecnologia        | Uso                                      |
|-------------------|------------------------------------------|
| HTML5 semântico   | Estrutura da SPA                         |
| CSS3 moderno      | Layout Grid/Flexbox, CSS Variables       |
| JavaScript ES6+   | Lógica, roteamento SPA, estado           |
| LocalStorage API  | Persistência do progresso                |
| GitHub Pages      | Hospedagem estática gratuita             |

---

## 📱 Funcionalidades

- **5 categorias de treino:** Peito, Leg Day, Dorsal, Ombros & Trapézio, Bíceps & Tríceps
- **Navegação SPA** sem reload de página
- **Checkbox por exercício** com salvamento automático
- **Barra de progresso** por treino
- **Indicador do último treino** acessado
- **Histórico e streak** de dias consecutivos
- **Botão "Resetar treino"** para recomeçar o dia
- **Modal de conclusão** ao finalizar todos os exercícios
- **Dark mode automático** (segue o sistema operacional)
- **Mobile-first**, otimizado para Safari no iOS
- **Transições suaves** e animações CSS

---

## 🚀 Como usar

### Localmente
1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` no navegador
3. Pronto — nenhuma instalação necessária

### Personalizando seus treinos
Edite o array `WORKOUTS` no início do arquivo `script.js`:

```js
const WORKOUTS = [
  {
    id: 'peito',         // identificador único (sem espaços)
    name: 'Peito',       // nome exibido na tela
    emoji: '💪',         // ícone do card
    exercises: [
      {
        name: 'Supino Reto',
        sets: '4 × 8–10',
        notes: 'Carga progressiva.',  // opcional
      },
      // ...
    ],
  },
  // adicione mais categorias aqui
];
```

---

## 🌐 Como publicar no GitHub Pages

1. **Crie um repositório** no GitHub (público ou privado com Pages habilitado)
2. **Faça upload** dos arquivos: `index.html`, `style.css`, `script.js` e a pasta `assets/` (se houver)
3. Acesse **Settings → Pages**
4. Em **Source**, selecione a branch `main` e a pasta `/ (root)`
5. Clique em **Save**
6. Aguarde alguns segundos — seu site estará disponível em:
   `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO`

> **Dica:** Para repositórios privados, o GitHub Pages está disponível nos planos pagos do GitHub.

---

## 📂 Estrutura de pastas

```
/
├── index.html      # Estrutura HTML da SPA
├── style.css       # Estilos (dark mode, mobile-first)
├── script.js       # Lógica, dados, roteamento
├── README.md       # Este arquivo
└── assets/         # (reservado para ícones, imagens futuras)
```

---

## 🔮 Roadmap (futuro)

- [ ] PWA completo com `manifest.json` e Service Worker offline
- [ ] Cronômetro de descanso entre séries
- [ ] Anotações de carga por sessão
- [ ] Exportar histórico em JSON
- [ ] Temas de cor personalizáveis

---

## 📄 Licença

MIT License — use, modifique e distribua livremente.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
