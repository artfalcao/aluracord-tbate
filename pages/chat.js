import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';


export default function ChatPage() {
    const [mensagem, setmensagem] = React.useState('');
    const [listaMensagens, setListamensagens] = React.useState([])

    function handlerNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaMensagens.length,
            de: 'artfalcao',
            texto: novaMensagem
        }
        setListamensagens([ mensagem, ...listaMensagens,])
        setmensagem('');
    }

    function handleDeleteMessage(id) {
        const apaga = listaMensagens.filter(
            (mensagem) => mensagem.id !== id
        );
        setListamensagens(apaga);
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['050'],
                backgroundImage: `url(https://images.alphacoders.com/116/thumb-1920-1168270.png)`,
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover', 
                backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '80%',
                    maxWidth: '85%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaMensagens} deleteMessage={handleDeleteMessage}  setListamensagens={setListamensagens} />


                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            borderRadius: "5px",
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setmensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()

                                    handlerNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                display:'flex',
                                width: '100%',
                                border: '0',
                                // resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            iconName="arrowRight"
                            label=""
                            colorVariant="positive"
                            onClick={(event) => {
                                event.preventDefault();
                                handlerNovaMensagem(mensagem);
                            }}
                            styleSheet={{
                                display: "flex",
                                maxWidth: "32px",
                                maxHeight: "32px",
                                marginRight: "8px",
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box 
                styleSheet={{ 
                    width: '100%', 
                    marginBottom: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                }} 
            >
                <Text variant='heading5'>Chat</Text>
                <Button
                    variant='primary'
                    colorVariant='negative'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const handlerDeleteMessage = props.deleteMessage

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/artfalcao.png`}
                            />
                            <Text tag="strong">{mensagem.de}</Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                label=""
                                iconName="trash"
                                variant="tertiary"
                                onClick={(event)=>{
                                    event.preventDefault();
                                handlerDeleteMessage(mensagem.id);
                                }}
                                styleSheet={{
                                    maxWidth: "20px",
                                    maxHeight: "20px",
                                    hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    color: "#E9400C",
                                    },                                   
                                }}
                            />
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}
        </Box>
    )
}