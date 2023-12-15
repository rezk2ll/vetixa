import pb from '$lib/pocketbase';
import { currentUser } from '$lib/store/user';

pb.authStore.loadFromCookie(document.cookie);

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
	document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
}, true);
