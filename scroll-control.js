
class ChildScroller {

    // let body = document.body;
    // const container = document.querySelector('.container');
    // const child = document.querySelector('.child');
    // Get the body, container, and child element
    // Flag to track if the child is currently being scrolled
    isChildScrolling = false;
    isChildScrollComplete = false;
    // Track the current scroll position of the body
    // bodyScrollPos = 0;
    lastScrollDirection = "up";
    // lastYPosition = 0;
    lastContainerYBeforeChildScroll = 0;
    container = null;
    child= null;
    constructor(container, child) {
        // The constructor method is called when a new instance of the class is created
        //   this.name = name;
        //   this.age = age;
        this.container = container;
        this.child = child;
        // console.log(this.container, this.child);
        
        // Listen to scroll events
        window.addEventListener('wheel', (event)=>this.onBodyScroll(event), { passive: false });
        this.child.addEventListener('scroll', (event)=>this.onChildScroll(event));
        window.addEventListener("keydown", (event)=>this.handleKeyDown(event));
        window.addEventListener('touchmove', (event)=>this.handleTouchMove(event), { passive: true });

        // console.log(this);
    }


    // Function to handle body scroll
    onBodyScroll(event) {
        // const currentScrollTop = event.deltaY;

        // console.log(event);
        // console.log("currentScrollTop ",lastYPosition);
        let scrollDirection = (event.deltaY >= 0) ? "down" : "up";
        const childRect = this.child.getBoundingClientRect();
        // const containerRect = container.getBoundingClientRect();

        // console.log(divCenterY, ",", viewportCenterY);

        // console.log("childRect.height", childRect.height, "window.innerHeight", window.innerHeight);
        if (this.isChildScrolling) {
            // console.log("this.child scrolling ");
            // console.log(event);
            // Prevent body scroll while this.child is scrolling
            event.preventDefault();
            // childRect.y = 30;
            
            this.container.scrollTop = this.lastContainerYBeforeChildScroll;
            this.child.scrollTop += event.deltaY; // Transfer scroll to the this.child
        } else {
            // Check if the body scroll has reached the this.child
            // console.log(childRect);
            // if (childRect.top < containerRect.bottom && childRect.bottom >= containerRect.top) {

            if (window.innerHeight > childRect.height && !this.isChildScrollComplete) {
                // this.child height less then windows height so this.child should be in center of view port to do scroll
                let divCenterY = childRect.top + childRect.height / 2;
                let viewportCenterY = window.innerHeight / 2;
                let scrollDiff = Math.abs(divCenterY - viewportCenterY);
                if (scrollDiff >= 0 && scrollDiff <= 20) {
                    // this.child scroll

                    this. isChildScrolling = true;
                    event.preventDefault();
                    if (scrollDirection == "down") {
                        this.child.scrollTop += event.deltaY;
                    } else {
                        this.child.scrollTop -= event.deltaY;
                    }


                    this.lastContainerYBeforeChildScroll = this.container.scrollTop;
                    this.container.scrollTop = this.lastContainerYBeforeChildScroll;
                }
            } else if (!this.isChildScrollComplete) {
                // this.child height greater then viewport height
                if (scrollDirection == "down" && childRect.top <= 80 && !this.isChildScrollComplete) {
                    // Allow the this.child to be scrolled
                    // console.log("this.child scrolling ");
                    // console.log(event);
                    this.  isChildScrolling = true;
                    event.preventDefault();
                    this.child.scrollTop += event.deltaY;
                    this.lastContainerYBeforeChildScroll = this.container.scrollTop;
                    this.container.scrollTop = this.lastContainerYBeforeChildScroll;
                } else if (scrollDirection == "up" && childRect.top <= 80 && childRect.top > 30 && !this.isChildScrollComplete) {
                    this.  isChildScrolling = true;
                    event.preventDefault();
                    this.child.scrollTop -= event.deltaY;
                    this.lastContainerYBeforeChildScroll = this.container.scrollTop;
                    this.container.scrollTop = this.lastContainerYBeforeChildScroll;
                }
            }


            //  if (scrollDirection == "down" && childRect.top <= 80 && !isChildScrollComplete) {
            //     // Allow the child to be scrolled
            //     // console.log("child scrolling ");
            //     // console.log(event);
            //     isChildScrolling = true;
            //     event.preventDefault();
            //     child.scrollTop += event.deltaY;
            //     lastContainerYBeforeChildScroll = container.scrollTop;
            //     container.scrollTop = lastContainerYBeforeChildScroll;
            // } else if (scrollDirection == "up" && childRect.top <= 80 && childRect.top > 30 && !isChildScrollComplete) {

            //     isChildScrolling = true;
            //     event.preventDefault();
            //     child.scrollTop -= event.deltaY;

            //     lastContainerYBeforeChildScroll = container.scrollTop;

            //     container.scrollTop = lastContainerYBeforeChildScroll;
            // } 
            else {
                this.isChildScrolling = false;
                // console.log("parent scrolling ");
                // console.log(event);
            }
        }
        if (scrollDirection !== this.lastScrollDirection) {
            this. isChildScrollComplete = false;
            // console.log("reset scrolling");
        }
        this.lastScrollDirection = scrollDirection;
        // lastYPosition = currentScrollTop;
    }

    // Function to handle child scroll
    onChildScroll(event) {
        // Check if child has reached the bottom
        // console.log(lastScrollDirection, child.scrollHeight, child.scrollTop, child.scrollHeight - child.scrollTop, " - ", child.clientHeight);

        if (this.lastScrollDirection == "down" && Math.abs((this.child.scrollHeight - this.child.scrollTop) - this.child.clientHeight) < 5) {
            // console.log("stop this.child scrolling");
            this.isChildScrollComplete = true;
            this.isChildScrolling = false; // Stop this.child scrolling when it reaches the bottom
        } else if (this.lastScrollDirection == "up" && this.child.scrollTop < 5) {
            this.isChildScrollComplete = true;
            this. isChildScrolling = false; // Stop child scrolling when it reaches the bottom

        }
    }
    // function onParentScroll(event) {


    //     // const containerRect = container.getBoundingClientRect(); 
    //     // console.log("parent scroll ", container.scrollTop);
    //     // console.log(containerRect);
    //     if (isChildScrolling) {
    //         // console.log("parent scroll prevent default");
    //         event.preventDefault();
    //     }
    // }

    // Function to simulate a wheel event
    triggerWheelEvent(deltaY) {
        const wheelEvent = new WheelEvent("wheel", {
            deltaY: deltaY,
            bubbles: true, // Event can bubble up through DOM
            cancelable: true, // Event can be canceled
            view: window // The current window (view)
        });

        // Dispatch the wheel event on the window
        window.dispatchEvent(wheelEvent);
    }

    // Handle the keydown event
    handleKeyDown(event) {
        if (event.key === "ArrowDown") {

            // Simulate scrolling down like a wheel down event
            triggerWheelEvent(20);  // Positive value indicates scrolling down
            // event.preventDefault();
        } else if (event.key === "ArrowUp") {
            // event.preventDefault();
            // Simulate scrolling up like a wheel up event
            triggerWheelEvent(-20);  // Negative value indicates scrolling up
            // event.preventDefault();
        }
        if (this.isChildScrolling) {
            event.preventDefault();
        }
    }
    // mobile touch move event
    handleTouchMove(event) {
        const touch = event.touches[0]; // Get the first touch point
        touchMoveY = touch.clientY;     // Update current Y position

        // Calculate the scroll difference (delta)
        const deltaY = touchStartY - touchMoveY;

        const wheelEvent = new WheelEvent("wheel", {
            deltaY: deltaY,
            bubbles: true, // Event can bubble up through DOM
            cancelable: true, // Event can be canceled
            view: window // The current window (view)
        });

        // Dispatch the wheel event on the window
        window.dispatchEvent(wheelEvent);
    }

    // container.addEventListener('scroll', onParentScroll);
}