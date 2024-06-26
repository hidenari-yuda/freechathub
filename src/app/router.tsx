import { createHashHistory, RootRoute, Route, Router, useParams } from '@tanstack/react-router'
import { BotId } from './bots'
import Layout from './components/Layout'
import MultiBotChatPanel from './pages/MultiBotChatPanel'
import PremiumPage from './pages/PremiumPage'
import SettingPage from './pages/SettingPage'
import SingleBotChatPanel from './pages/SingleBotChatPanel'

const rootRoute = new RootRoute()

const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  component: Layout,
  id: 'layout',
})

const indexRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: MultiBotChatPanel,
})

function ChatRoute() {
  const { botId } = useParams({ from: chatRoute.id })
  return <SingleBotChatPanel botId={botId as BotId} />
}

const chatRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: 'chat/$botId',
  component: ChatRoute,
})

const settingRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: 'setting',
  component: SettingPage,
})

export const premiumRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: 'premium',
  component: PremiumPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      source: search.source as string | undefined,
    }
  },
})

const routeTree = rootRoute.addChildren([layoutRoute.addChildren([indexRoute, chatRoute, settingRoute, premiumRoute])])

const hashHistory = createHashHistory()
const router = new Router({ routeTree, history: hashHistory })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router }

// import { createBrowserRouter } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MultiBotChatPanel />,
//   },
//   {
//     path: '/chat/:botId',
//     element: <SingleBotChatPanel />,
//   },
//   {
//     path: '/setting',
//     element: <SettingPage />,
//   },
//   {
//     path: '/premium',
//     element: <PremiumPage />,
// ])
