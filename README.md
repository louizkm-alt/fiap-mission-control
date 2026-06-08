# FIAP Mission Control

Aplicativo mobile desenvolvido em **React Native + Expo** para simular uma **Central de Monitoramento de Missões Espaciais**.

## Integrantes

Preencha antes de entregar:

- Nome completo: `________________________` | RM: `________`
- Nome completo: `________________________` | RM: `________`
- Nome completo: `________________________` | RM: `________`

## Objetivo

O app simula um painel de controle de missão espacial, com acompanhamento de telemetria, energia, comunicação, estabilidade orbital, alertas e atualização de dados via formulário.

## Funcionalidades implementadas

- Dashboard com sensores, energia, comunicação e estabilidade orbital.
- Alertas automáticos para níveis críticos de oxigênio, bateria, comunicação, temperatura, casco e desvio orbital.
- Tela de detalhe dos alertas com recomendação operacional.
- Formulário com validação de campos obrigatórios, formatos e limites.
- Navegação entre telas usando Expo Router.
- Persistência local com AsyncStorage.
- Estado global com Context API.
- Tela de configurações com persistência local.
- Histórico operacional da missão.

## Tecnologias

- React Native
- Expo SDK 54
- Expo Router
- Expo SDK 54
- Expo Router Router
- Context API
- AsyncStorage
- TypeScript

## Como executar

Instale as dependências:

```bash
npm install
npx expo install --fix
```

Execute o app:

```bash
npm start
```

Depois, use o Expo Go no celular ou rode no emulador Android/iOS.

## Estrutura principal

```txt
app/
  _layout.tsx
  index.tsx
  (tabs)/
    dashboard.tsx
    mission.tsx
    update.tsx
    settings.tsx
  alerts/
    [id].tsx
components/
context/
data/
utils/
constants/
assets/images/
```

## Evidências para a rubrica

### Context API

Arquivo principal:

```txt
context/MissionContext.tsx
```

Ele centraliza missão, sensores, configurações, histórico e ações globais.

### AsyncStorage

Também em:

```txt
context/MissionContext.tsx
```

O estado é carregado e salvo na chave local:

```txt
@fiap-mission-control/state-v1
```

### Expo Router

Arquivos de rota:

```txt
app/(tabs)/dashboard.tsx
app/(tabs)/mission.tsx
app/(tabs)/update.tsx
app/(tabs)/settings.tsx
app/alerts/[id].tsx
```

### Validação

Arquivo:

```txt
utils/validators.ts
```

A tela `app/(tabs)/update.tsx` usa essa validação antes de salvar os dados.

## Sugestão de commits para demonstrar evolução

1. `chore: criar projeto Expo com TypeScript`
2. `feat: implementar navegação com Expo Router`
3. `feat: criar Context API da missão`
4. `feat: adicionar persistência com AsyncStorage`
5. `feat: criar dashboard de telemetria`
6. `feat: implementar alertas automáticos`
7. `feat: adicionar formulário com validação`
8. `style: aplicar tema espacial`
9. `docs: atualizar README e arquivo de entrega`

## Arquivo de entrega

No portal FIAP, enviar um arquivo `.txt` com nomes, RMs e link do GitHub.
