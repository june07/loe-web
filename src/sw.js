import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST);

const broadcastChannel = 'BroadcastChannel' in self ? new BroadcastChannel('messages') : null

const shareTargetHandler = async ({ event }) => {
	if (broadcastChannel) {
		broadcastChannel.postMessage('Saving media locally...')
	}
	event
	debugger
	// After the POST succeeds, redirect to the main page.
	return Response.redirect('/', 303)
}

registerRoute('/_share-target', shareTargetHandler, 'GET')
