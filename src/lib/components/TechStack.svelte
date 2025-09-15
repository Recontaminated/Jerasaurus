<script lang="ts">
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';

	interface TechItem {
		name: string;
		icon?: string;
		iconUrl?: string;
		color?: string;
	}

	// Developer - Languages
	const devLanguages: TechItem[] = [
		{ name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
		{ name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
		{ name: 'Go', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' }
	];

	// Developer - Frameworks
	const devFrameworks: TechItem[] = [
		{ name: 'Svelte', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
		{ name: 'Vue', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
		{ name: 'Jest', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' }
	];

	// Developer - Technologies
	const devTechnologies: TechItem[] = [
		{ name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
		{ name: 'Kubernetes', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
		{ name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
		{ name: 'AWS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' }
	];

	// Embedded - Languages
	const embLanguages: TechItem[] = [
		{ name: 'C++', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
		{ name: 'Rust', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
		{ name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' }
	];

	// Embedded - Technologies
	const embTechnologies: TechItem[] = [
		{ name: 'CAN Bus', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z', color: '#1976D2' },
		{ name: 'FreeRTOS', iconUrl: '/Arch_FreeRTOS_16.svg' }
	];

	// Embedded - Platforms
	const embPlatforms: TechItem[] = [
		{ name: 'RP2040', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg' },
		{ name: 'Teensy', icon: 'M2 6c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V6zm2 1v10h16V7H4zm1 1h2v2H5V8zm3 0h2v2H8V8zm3 0h2v2h-2V8zm3 0h2v2h-2V8zm3 0h2v2h-2V8zm-12 3h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-12 3h2v2H5v-2zm3 0h2v2H8v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-9-2h4v4h-4v-4z', color: '#00878F' },
		{ name: 'STM32', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.93c0 .04-.01.07-.01.07H11v-6h2v5.93zm0-7.93h-2V7h2v3z', color: '#03234B' },
		{ name: 'PX4', iconUrl: 'https://avatars.githubusercontent.com/u/2096014?s=200&v=4' }
	];

	const embeddedTech: TechItem[] = [
		{ name: 'C', icon: 'M11.372 11.372V5.862c0-.904-.304-1.684-.911-2.34-.608-.656-1.364-.984-2.27-.984-1.128 0-2.045.415-2.752 1.245-.707.83-1.06 1.835-1.06 3.015 0 1.195.356 2.17 1.069 2.923.712.753 1.63 1.13 2.752 1.13.864 0 1.603-.32 2.216-.958.614-.64.92-1.387.92-2.242v-.28zm10.625.006c0 1.854-.464 3.335-1.39 4.443-.928 1.108-2.153 1.662-3.678 1.662-1.327 0-2.352-.462-3.075-1.385v5.155c0 .235-.078.435-.234.598a.793.793 0 01-.584.246h-2.088a.82.82 0 01-.608-.246.826.826 0 01-.234-.598V7.215c0-.227.078-.421.234-.584a.811.811 0 01.608-.243h2.088c.227 0 .421.08.584.243.162.163.243.357.243.584v.539c.723-.97 1.748-1.455 3.075-1.455 1.524 0 2.75.558 3.678 1.675.927 1.116 1.39 2.597 1.39 4.443v.04z', color: '#A8B9CC' },
		{ name: 'C++', icon: 'M22.394 6c-.167-.29-.398-.56-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.56.652.69l8.816 5.09c.254.147.568.22.882.22s.628-.073.882-.22l8.816-5.09c.254-.13.485-.4.652-.69.167-.29.271-.616.271-.91V6.91c0-.294-.104-.62-.271-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z', color: '#00599C' },
		{ name: 'Rust', icon: 'M23.835 11.7l-1.008-.623a13.14 13.14 0 0 0-.034-.602l.874-.798a.342.342 0 0 0-.139-.571l-1.144-.388a8.64 8.64 0 0 0-.124-.584l.717-.936a.343.343 0 0 0-.223-.537l-1.215-.14a9.24 9.24 0 0 0-.208-.552l.544-1.052a.344.344 0 0 0-.297-.48l-1.238.072a13.73 13.73 0 0 0-.286-.502l.353-1.147a.342.342 0 0 0-.36-.404l-1.2.305c-.115-.154-.233-.304-.355-.45l.15-1.193a.343.343 0 0 0-.419-.318l-1.122.513c-.134-.123-.27-.242-.41-.359l-.06-1.206a.342.342 0 0 0-.457-.22l-1.02.713a11.97 11.97 0 0 0-.454-.29l-.268-1.178a.343.343 0 0 0-.483-.116l-.878.887c-.165-.083-.332-.162-.5-.239L12.85.419a.344.344 0 0 0-.491-.006l-.703 1.018c-.18-.047-.36-.092-.543-.132L10.635.156a.343.343 0 0 0-.484.097l-.496 1.136a14.05 14.05 0 0 0-.558-.04L8.412.345a.342.342 0 0 0-.458.193l-.275 1.217c-.19.012-.38.03-.57.05L6.213.91a.343.343 0 0 0-.417.283l-.04 1.254a12.73 12.73 0 0 0-.552.133L4.094 1.808a.343.343 0 0 0-.361.365l.199 1.239c-.176.074-.35.152-.522.234L2.182 2.97a.34.34 0 0 0-.286.428l.435 1.18c-.156.103-.31.21-.46.32L.516 4.417a.342.342 0 0 0-.196.476l.653 1.074c-.133.13-.263.264-.39.4l-1.477-.39a.343.343 0 0 0-.093.495l.841.944a10.37 10.37 0 0 0-.323.462l-1.457-.6a.344.344 0 0 0 .017.509l1.009.797c-.09.17-.176.341-.258.515l-1.364-.823a.344.344 0 0 0 .123.515l1.133.622a9.649 9.649 0 0 0-.171.544l-1.244-1.003a.343.343 0 0 0 .226.495l1.235.385c-.04.188-.078.378-.11.569l-1.085-1.17a.343.343 0 0 0 .318.457l1.217.137c-.018.195-.032.39-.042.587l-.88-1.318a.344.344 0 0 0 .397.403l1.2-.301c.008.197.02.394.037.591l-.636-1.431a.343.343 0 0 0 .46.34l1.121-.511c.03.194.062.387.1.58l-.376-1.513a.343.343 0 0 0 .506.257l1.019-.712c.053.184.11.368.17.55l-.104-1.549a.344.344 0 0 0 .537.159l.878-.887c.08.17.162.337.248.503l.172-1.536a.343.343 0 0 0 .548.055l.703-1.017c.104.15.212.298.324.444l.442-1.478a.343.343 0 0 0 .543-.054l.497-1.135c.129.124.26.246.394.365l.699-1.355a.343.343 0 0 0 .518-.149l.274-1.216c.151.094.306.186.462.274l.934-1.181a.343.343 0 0 0 .476-.238l.041-1.254c.17.057.34.11.514.16l1.138-.974a.342.342 0 0 0 .415-.316l-.198-1.239c.182.017.365.03.549.04l1.299-.733a.343.343 0 0 0 .336-.38l-.433-1.182c.187-.02.375-.043.563-.07l1.407-.48a.342.342 0 0 0 .24-.424l-.651-1.074c.187-.047.372-.097.557-.152l1.468-.205a.343.343 0 0 0 .13-.455l-.84-.944c.18-.08.357-.163.532-.25l1.476.116a.343.343 0 0 0 .01-.465l-1.009-.798c.166-.106.33-.217.49-.33l1.418.333a.343.343 0 0 0-.11-.465l-1.133-.622c.149-.135.295-.274.438-.415l1.305.552a.343.343 0 0 0-.215-.442l-1.234-.385c.126-.158.249-.32.368-.483l1.152.764a.343.343 0 0 0-.309-.402l-1.216-.14c.1-.178.197-.358.29-.54l.96.928a.343.343 0 0 0-.39-.346l-1.199.3c.07-.191.136-.384.199-.58l.745 1.074a.343.343 0 0 0-.453-.274l-1.12.511a9.237 9.237 0 0 0 .108-.602l.501 1.176a.343.343 0 0 0-.498-.187l-1.018.711c.025-.2.045-.4.062-.602l.238 1.241a.344.344 0 0 0-.526-.086l-.877.886a13.847 13.847 0 0 0-.03-.607l-.033 1.263a.343.343 0 0 0-.535.017l-.703 1.018a14.257 14.257 0 0 0-.127-.583l-.308 1.224a.343.343 0 0 0-.522.12l-.495 1.135c-.08-.185-.164-.368-.252-.548l-.565 1.128a.342.342 0 0 0-.487.212l-.274 1.217a11.04 11.04 0 0 0-.34-.485l-.787.99a.342.342 0 0 0-.432.295zM12 17.373a5.373 5.373 0 1 1 0-10.746 5.373 5.373 0 0 1 0 10.746zm-.847-9.593a.22.22 0 0 0-.22.22v1.202a2.078 2.078 0 0 0-1.042.387l-.85-.85a.22.22 0 0 0-.312 0l-.6.599a.22.22 0 0 0 0 .312l.85.85c-.238.316-.387.696-.387 1.103a2.104 2.104 0 0 0 2.104 2.104c.408 0 .787-.15 1.103-.388l.85.85a.22.22 0 0 0 .311 0l.6-.6a.22.22 0 0 0 0-.311l-.85-.85c.237-.316.387-.695.387-1.103v-.457h.984a.22.22 0 0 0 .22-.22V9.602a.22.22 0 0 0-.22-.22h-.984v-.202h.984a.22.22 0 0 0 .22-.22V7.96a.22.22 0 0 0-.22-.22zm4.915 6.037l-.604.7c-.957 0-1.732-.539-1.732-1.204 0-.665.775-1.204 1.732-1.204l.604.7v1.008zm.828-3.763l-1.432 1.658c-1.37 0-2.481.935-2.481 2.088s1.11 2.089 2.481 2.089l1.432 1.658a.22.22 0 0 0 .313.027l.565-.488a.22.22 0 0 0 .027-.314l-.9-1.042v-4.146l.9-1.042a.22.22 0 0 0-.027-.313l-.565-.488a.22.22 0 0 0-.313.027zm-9.262 4.577a.635.635 0 0 1 .455-.544v-.325H6.82c-.665 0-1.204-.54-1.204-1.204a1.206 1.206 0 0 1 2.05-.854c.087.087.204.153.335.153a.457.457 0 0 0 .306-.126l.008-.006.491-.492a.442.442 0 0 0 0-.625 2.493 2.493 0 0 0-3.541 0 2.493 2.493 0 0 0-.732 1.769c0 .668.26 1.296.732 1.768.205.205.432.367.674.486v.344a.635.635 0 0 1-.455.545l-1.615.47a.22.22 0 0 0-.151.28l.198.678a.22.22 0 0 0 .279.152l1.616-.47a1.363 1.363 0 0 0 .978-1.309 1.36 1.36 0 0 0-.978-1.308l.856-.25a.22.22 0 0 0 .152-.28l-.198-.677a.22.22 0 0 0-.279-.152z', color: '#000000' },
		{ name: 'RTOS', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z', color: '#4CAF50' },
		{ name: 'PCB Design', icon: 'M17 13h-4v-2h4c1.65 0 3-1.35 3-3s-1.35-3-3-3h-4V3h4c2.76 0 5 2.24 5 5s-2.24 5-5 5zm-6 8c-2.76 0-5-2.24-5-5s2.24-5 5-5h4v2h-4c-1.65 0-3 1.35-3 3s1.35 3 3 3h4v2h-4zM9 11h6v2H9z', color: '#00897B' },
		{ name: 'Firmware', icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z', color: '#FF6F00' },
		{ name: 'CAN Bus', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z', color: '#1976D2' },
		{ name: 'I2C/SPI', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', color: '#673AB7' },
		{ name: 'ARM Cortex', icon: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V8.93l7-3.11v7.17z', color: '#0091BD' },
		{ name: 'ESP32', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z', color: '#E7352C' },
		{ name: 'STM32', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.93c0 .04-.01.07-.01.07H11v-6h2v5.93zm0-7.93h-2V7h2v3z', color: '#03234B' },
		{ name: 'Linux Embedded', icon: 'M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.229.616-.279.784-.109 1.106.229.43.602.606 1.23.813l.289.065c.947.216 1.852.27 2.681.107 1.164-.228 1.977-.783 2.533-1.372.238-.251.448-.517.639-.796a6.002 6.002 0 001.172-1.752c.302-.642.53-1.353.653-2.124.125-.769.154-1.589.064-2.455-.047-.452-.147-.913-.283-1.379a14.98 14.98 0 00-.411-1.343c-.221-.604-.526-1.192-.813-1.779-.287-.588-.543-1.176-.737-1.783-.194-.607-.314-1.232-.292-1.891.022-.651.17-1.339.615-2.014.526-.793.901-1.461 1.177-1.96.26-.473.408-.776.493-.908l.018-.024c.024-.032.038-.05.054-.072.165-.218.248-.45.248-.694C12.93.322 12.73.08 12.504 0zm-.162.194c.08 0 .145.067.145.152a.15.15 0 01-.145.152.15.15 0 01-.145-.152c0-.085.065-.152.145-.152zm-2.035.647c-.193.04-.37.168-.486.347-.128.194-.178.43-.14.665.04.248.155.47.331.629a.872.872 0 00.606.267.844.844 0 00.438-.118 1.012 1.012 0 00.327-.323.908.908 0 00.138-.402.823.823 0 00-.048-.415.73.73 0 00-.24-.333.679.679 0 00-.382-.157.537.537 0 00-.094-.004c-.066 0-.132.01-.199.021a.552.552 0 00-.252.123zm3.413.259c-.194-.04-.405-.01-.59.084a.91.91 0 00-.408.385.945.945 0 00-.108.468c.007.238.083.463.215.651.13.185.309.328.517.417.21.09.438.122.661.09a.955.955 0 00.544-.285.985.985 0 00.306-.516.948.948 0 00-.025-.561.824.824 0 00-.316-.428.668.668 0 00-.416-.122c-.06 0-.124.008-.189.023a.552.552 0 00-.189.094zm-4.063 10.93c-.16-.008-.33.009-.498.051a1.803 1.803 0 00-.91.533 1.872 1.872 0 00-.486.963c-.078.401-.02.817.17 1.183.19.363.503.66.872.844a1.814 1.814 0 001.193.17c.395-.096.75-.318 1.006-.622.256-.303.402-.68.408-1.074a1.901 1.901 0 00-.149-.833 1.763 1.763 0 00-.529-.677 1.593 1.593 0 00-.74-.337 1.454 1.454 0 00-.337-.201zm4.948.193a1.44 1.44 0 00-.53.126c-.33.145-.617.405-.808.72a1.906 1.906 0 00-.243.998c.013.395.146.774.382 1.085.236.311.57.544.95.658.381.114.793.099 1.16-.042a1.721 1.721 0 00.884-.698c.223-.337.337-.737.318-1.138a1.845 1.845 0 00-.326-1.018 1.698 1.698 0 00-.83-.631 1.526 1.526 0 00-.628-.073c-.11 0-.22.004-.329.013z', color: '#FCC624' },
		{ name: 'Yocto', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z', color: '#5A8FDB' },
		{ name: 'Buildroot', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z', color: '#FF9800' }
	];
</script>

<section class="relative mx-auto max-w-6xl px-6 py-24">
	<ScrollReveal delay={100}>
		<div class="text-center mb-12">
			<div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur mb-6">
				<span class="text-sm text-white/60">Tech Stack</span>
			</div>
			<h2 class="text-3xl sm:text-4xl font-bold text-white/90">
				Bridging Software & Hardware
			</h2>
			<p class="mt-4 text-lg text-white/70 max-w-3xl mx-auto">
				These are the tools that I have worked with recently
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-8">
			<!-- Developer Technologies -->
			<div class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
				<h3 class="text-xl font-semibold text-white/90 mb-6 flex items-center gap-2">
					<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
					</svg>
					Developer
				</h3>

				<!-- Languages Section -->
				<div class="mb-6">
					<h4 class="text-sm font-medium text-white/70 mb-3">Languages</h4>
					<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
						{#each devLanguages as tech}
							<div class="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
								<div class="w-12 h-12 flex items-center justify-center">
									{#if tech.iconUrl}
										<img src={tech.iconUrl} alt={tech.name} class="w-10 h-10 transition-transform group-hover:scale-110" />
									{:else if tech.icon}
										<svg
											viewBox="0 0 24 24"
											class="w-10 h-10 transition-transform group-hover:scale-110"
											style="fill: {tech.color}"
										>
											<path d={tech.icon} />
										</svg>
									{/if}
								</div>
								<span class="text-xs text-white/60 text-center">{tech.name}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Frameworks Section -->
				<div class="mb-6">
					<h4 class="text-sm font-medium text-white/70 mb-3">Frameworks</h4>
					<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
						{#each devFrameworks as tech}
							<div class="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
								<div class="w-12 h-12 flex items-center justify-center">
									{#if tech.iconUrl}
										<img src={tech.iconUrl} alt={tech.name} class="w-10 h-10 transition-transform group-hover:scale-110" />
									{:else if tech.icon}
										<svg
											viewBox="0 0 24 24"
											class="w-10 h-10 transition-transform group-hover:scale-110"
											style="fill: {tech.color}"
										>
											<path d={tech.icon} />
										</svg>
									{/if}
								</div>
								<span class="text-xs text-white/60 text-center">{tech.name}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Technologies Section -->
				<div>
					<h4 class="text-sm font-medium text-white/70 mb-3">Technologies</h4>
					<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
						{#each devTechnologies as tech}
							<div class="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
								<div class="w-12 h-12 flex items-center justify-center">
									{#if tech.iconUrl}
										<img src={tech.iconUrl} alt={tech.name} class="w-10 h-10 transition-transform group-hover:scale-110" />
									{:else if tech.icon}
										<svg
											viewBox="0 0 24 24"
											class="w-10 h-10 transition-transform group-hover:scale-110"
											style="fill: {tech.color}"
										>
											<path d={tech.icon} />
										</svg>
									{/if}
								</div>
								<span class="text-xs text-white/60 text-center">{tech.name}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Embedded Engineer -->
			<div class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
				<h3 class="text-xl font-semibold text-white/90 mb-6 flex items-center gap-2">
					<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
					</svg>
					Embedded Engineer
				</h3>

				<!-- Languages Section -->
				<div class="mb-6">
					<h4 class="text-sm font-medium text-white/70 mb-3">Languages</h4>
					<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
						{#each embLanguages as tech}
							<div class="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
								<div class="w-12 h-12 flex items-center justify-center">
									{#if tech.iconUrl}
										<img src={tech.iconUrl} alt={tech.name} class="w-10 h-10 transition-transform group-hover:scale-110" />
									{:else if tech.icon}
										<svg
											viewBox="0 0 24 24"
											class="w-10 h-10 transition-transform group-hover:scale-110"
											style="fill: {tech.color}"
										>
											<path d={tech.icon} />
										</svg>
									{/if}
								</div>
								<span class="text-xs text-white/60 text-center">{tech.name}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Technologies Section -->
				<div class="mb-6">
					<h4 class="text-sm font-medium text-white/70 mb-3">Technologies</h4>
					<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
						{#each embTechnologies as tech}
							<div class="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
								<div class="w-12 h-12 flex items-center justify-center">
									{#if tech.iconUrl}
										<img src={tech.iconUrl} alt={tech.name} class="w-10 h-10 transition-transform group-hover:scale-110" />
									{:else if tech.icon}
										<svg
											viewBox="0 0 24 24"
											class="w-10 h-10 transition-transform group-hover:scale-110"
											style="fill: {tech.color}"
										>
											<path d={tech.icon} />
										</svg>
									{/if}
								</div>
								<span class="text-xs text-white/60 text-center">{tech.name}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Platforms Section -->
				<div>
					<h4 class="text-sm font-medium text-white/70 mb-3">Platforms</h4>
					<div class="grid grid-cols-3 sm:grid-cols-4 gap-4">
						{#each embPlatforms as tech}
							<div class="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/5 transition-colors">
								<div class="w-12 h-12 flex items-center justify-center">
									{#if tech.iconUrl}
										<img src={tech.iconUrl} alt={tech.name} class="w-10 h-10 transition-transform group-hover:scale-110" />
									{:else if tech.icon}
										<svg
											viewBox="0 0 24 24"
											class="w-10 h-10 transition-transform group-hover:scale-110"
											style="fill: {tech.color}"
										>
											<path d={tech.icon} />
										</svg>
									{/if}
								</div>
								<span class="text-xs text-white/60 text-center">{tech.name}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Additional info -->
		<div class="mt-12 text-center">
			<p class="text-sm text-white/50">
				... and always exploring new technologies to solve complex problems
			</p>
		</div>
	</ScrollReveal>
</section>