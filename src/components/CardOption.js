import { Grid, Paper, Card, CardHeader, Avatar, CardContent } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function CardOption(component_props) {
  const { options_list, onClick } = component_props;
  return (
    <div>
      <Grid container direction = { 'row' } justifyContent = { 'center' } style = {{ paddingTop: 40 }}>
      {
        options_list.map(({ name, image }, key) => {
          return (
            <Grid
              item 
              xs={ 6 } 
              sm={ 6 } 
              md={ 4 } 
              lg={ 4 }
              style = {{ padding: '2% 2% 0% 2%' }}
              onClick = { () => onClick(name) }
              key = { key }
            >
              <Paper elevation = { 6 } square>
                <Card style = {{ maxWidth: '100%', height: '280px', cursor: 'pointer' }} elevation = { 1 }>
                  <CardHeader
                    avatar = { <Avatar aria-label = 'recipe' style = {{ 'backgroundColor': blue[500] }}>{ name.charAt(0) }</Avatar> }
                    title = { name }
                  />
                  <CardContent>
                    <Grid container direction = { 'row' } justifyContent = { 'center' }>
                      <Grid item xs = { 12 } sm = { 12 } md = { 12 } style = {{ textAlign: 'center', height: '150px' }}>
                        <img 
                          src = { image } 
                          style = {{ width: '150px', maxWidth: '200px', minWidth: '100px', height: '150px' }} 
                          alt = 'Imagen Nuevo' 
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          )
        })
      }
      </Grid>
    </div>
  )
}