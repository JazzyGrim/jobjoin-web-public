export function isInViewport( element ) { // Check if element is within the viewport
    if ( !element ) return false; // If the lastElement is set
    const top = element.getBoundingClientRect( ).top; // Get the top position of the element
    return ( top ) >= 0 && ( top ) <= window.innerHeight; // If the element's top position falls within bounds of the screen
}

export function isVisibleInsideContainer( element, container, partial ) {
    console.log( element );
    console.log( container );
    //Get container properties
    let cTop = container.scrollTop;
    let cBottom = cTop + container.clientHeight;

    //Get element properties
    let eTop = element.offsetTop;
    let eBottom = eTop + element.clientHeight;

    //Check if in view    
    let isTotal = (eTop >= cTop && eBottom <= cBottom);
    let isPartial = partial && (
      (eTop < cTop && eBottom > cTop) ||
      (eBottom > cBottom && eTop < cBottom)
    );

    //Return outcome
    return  (isTotal  || isPartial);
}