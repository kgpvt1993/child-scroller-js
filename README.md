add following code to your site.
just create class of ChildScroller and pass parent container and child container as per following example.

```
  <script src="scroll-control.js"></script>
    <script>
        const container = document.querySelector('.container');
        const child = document.querySelector('.child');
        let scroller = new ChildScroller(container,child);
    </script>

```