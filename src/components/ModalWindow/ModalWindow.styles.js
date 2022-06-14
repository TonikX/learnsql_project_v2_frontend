export default (theme) => ({
    modalWindowContainer: {
        zIndex: '10001',

        position: 'fixed',
        margin: 'auto',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',

        padding: '10px',

        opacity: 0,

        transition: '.5s',

        overflowY: "scroll",
        "&::-webkit-scrollbar": {
            width: 0
        },
    },
    modalWindowContainer_blackout: {
         background: '#00000085',
    },

    modalWindowContainer_open: {
      opacity: 1
    },
    modalWindowBody: {
        position: 'absolute',
        margin: 'auto',
        left: '15px',
        right: '15px',
        top: '100px',
        background: 'white',
        borderRadius: '10px',
        width: 'max-content',
        height: 'max-content',
        padding: '15px',
        transition: '.5s'
    },
    modalWindowBody_shadow: {
      boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.25)'
    },

    modalWindowBody_open: {
        top: '15px',
    },
    modalWindowBody_center: {
        bottom: '15px'
    },

    modalWindowCloseButton: {
        cursor: 'pointer',
        position: 'absolute',
        height: '10px',
        width: '10px',
        right: '10px',
        top: '10px',
        "&::before": {
            content: "''",
            position: 'absolute',
            margin: 'auto',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            background: 'black',
            height: '100%',
            width: '2px',
            transform: 'rotate(-45deg)'
        },
        "&::after": {
            content: "''",
            position: 'absolute',
            margin: 'auto',
            left: '0',
            right: '0',
            top: '0',
            bottom: '0',
            background: 'black',
            height: '100%',
            width: '2px',
            transform: 'rotate(45deg)'
        }
    }
})
