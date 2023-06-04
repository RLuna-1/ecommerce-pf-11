

app.get('/', (req, res) => {
    console.log('se requiere /');
    res.status(200).json({ok:true})
    })