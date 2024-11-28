const propertiesMenuNode = document.querySelector('.burg-menu')

propertiesMenuNode.addEventListener('click', function() {
    showMenu()
}) 

function showMenu() {
    if (propertiesMenuNode.querySelector('.prop-menu-outher')) {
        let elemToDelete = propertiesMenuNode.querySelector('.prop-menu-outher') 
        propertiesMenuNode.removeChild(elemToDelete)
        return
    }
    const menuDiv = document.createElement('div')
    console.log(menuDiv)
    menuDiv.classList.add('prop-menu-outher')
    menuDiv.innerHTML = `<div class='prop-menu-inner'>
                            <div class='menu-option option-1'>
                            <div class='theme-toggle'></div>
                            </div>
                            <div class='menu-option option-2'>
                            <div class='lang-toggle'></div>
                            </div>
                        </div>`
    
    propertiesMenuNode.appendChild(menuDiv)
}



