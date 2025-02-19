lint:
	ng lint

test:
	ng test --no-watch --no-progress --browsers=FirefoxHeadless

start:
	ng serve

ci: lint test

# makefile só funciona com identação com tabs