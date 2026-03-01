import pb from '$lib/pocketbase';
import { currentUser } from '$store/user';

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.model);
});
