def name = params.name ?: "No Name"

html.html {
	head {
		title "Hello from Groovlet!"
	}
	body {
		h1 "Hello, ${name}!"
	}
}