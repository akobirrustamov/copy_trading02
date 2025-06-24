package com.example.backend.service.MainApiService;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import org.asynchttpclient.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainApiServiceImpl implements MainApiService {
    private final BotTradersRepository botTradersRepository;
    private final BotSubscribeRepository botSubscribeRepository;
    private final BotUsersRepository botUsersRepository;
    private final ChannelPostRepository channelPostRepository;
    private final HistoryOfTradeRepository history;
    @Override
    public void goWork() throws IOException {
        System.out.printf("Go Work\n");
        List<BotTraders> all = botTradersRepository.findAllByTraderTYpe();
        System.out.println(all);
        for (BotTraders botTraders : all) {
            Response response = rapidApi(botTraders.getUid());
            String responseBody = response.getResponseBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            if (jsonNode.has("data")) {

                JsonNode dataNode = jsonNode.get("data");
                JsonNode positionsNode = dataNode.get(0).path("positions").path("perpetual");
                String oldTrade = botTraders.getTraderpositions();
                checkTraderPositionChanges(botTraders, positionsNode, oldTrade)
                        .thenAcceptAsync(result -> {
                        });
            }
            try {
                Thread.sleep(50); // 10 milliseconds = 0.01 seconds
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

        }

    }

    private CompletableFuture<Void> checkTraderPositionChanges(BotTraders botTraders, JsonNode newPosition, String oldTrade) {
        return CompletableFuture.runAsync(() -> {
            ObjectMapper objectMapper = new ObjectMapper();
            List<Position> oldPositions = new ArrayList<>();
            if (oldTrade.equals("")){
                botTraders.setTraderpositions(newPosition.toString());
                botTradersRepository.save(botTraders);
                return;
            }

            if(!newPosition.isNull() && oldTrade.equals("null")){
                botTraders.setTraderpositions(newPosition.toString());
                botTradersRepository.save(botTraders);
                openOrderForAll(oldPositions,botTraders.getUid(),"open");
                return;
            }
            try {
                oldPositions = objectMapper.readValue(oldTrade, new TypeReference<List<Position>>() {});
            } catch (IOException e) {
                e.printStackTrace();
            }
            if(newPosition.isNull() && !oldPositions.equals("null")){
                botTraders.setTraderpositions(newPosition.toString());
                botTradersRepository.save(botTraders);
                openOrderForAll(oldPositions,botTraders.getUid(),"close");
                return;
            }

            List<Position> newPositionList = new ArrayList<>();
            try {
                newPositionList = objectMapper.readValue(newPosition.toString(), new TypeReference<List<Position>>() {});
            } catch (IOException e) {
                e.printStackTrace();
            }
            List<Position> finalOldPositions = oldPositions;
            List<Position> openList = newPositionList.stream()
                    .filter(newPos -> finalOldPositions.stream().noneMatch(oldPos -> oldPos.getSymbol().equals(newPos.getSymbol())))
                    .collect(Collectors.toList());
            List<Position> finalNewPositionList = newPositionList;
            List<Position> closeList = oldPositions.stream()
                    .filter(oldPos -> finalNewPositionList.stream().noneMatch(newPos -> newPos.getSymbol().equals(oldPos.getSymbol())))
                    .collect(Collectors.toList());
            if(!(openList.equals(closeList))){
                botTraders.setTraderpositions(newPosition.toString());
                botTradersRepository.save(botTraders);
//                System.out.println("saved");
            }

            if (openList.size()!=0)openOrderForAll(openList,botTraders.getUid(),"open");
            if (closeList.size()!=0)openOrderForAll(closeList,botTraders.getUid(),"close");
        });



    }

    private void openOrderForAll(List<Position> orderList,String uid, String typeOrder){
        List<BigInteger> allByTraderIdAndPosition = botSubscribeRepository.findAllByTraderIdAndPosition(uid);
//        System.out.println(allByTraderIdAndPosition.size());
        boolean pozition=true;
        if(typeOrder.equals("close"))pozition=false;
        saveChannelPost(orderList, uid, pozition);
        Integer count=1;
        String data="[";
        for (Position position : orderList) {
            data+=position.toString()+",";
        }

        data = data.substring(0, data.length() - 1)+"]";



        List<OpenOrder> server1=new ArrayList<>();
        List<OpenOrder> server2=new ArrayList<>();
        List<OpenOrder> server3=new ArrayList<>();
        for (BigInteger bigInteger : allByTraderIdAndPosition) {
//            System.out.println(bigInteger);
            BotUsers botUsers = botUsersRepository.findById(bigInteger).orElseThrow();
            OpenOrder closeOrder=new OpenOrder(bigInteger,botUsers.toString(), data);
            if(!botUsers.getKucoin().isEmpty()){
                server1.add(closeOrder);
//                    sendData(closeOrder, "91.186.196.75", typeOrder);
            }else {
                if (count == 1) {
                    server2.add(closeOrder);
//                        sendData(closeOrder, "147.45.110.144", typeOrder);
                }
                if (count == 2) {
                    server3.add(closeOrder);
//                        sendData(closeOrder, "212.60.21.123", typeOrder);
                    count=1;
                }
                 else {
                    count += 1;
                }
            }
        }

        sendData(server1, "93.93.207.155", typeOrder);
        sendData(server2, "82.97.252.143", typeOrder);
        sendData(server3, "93.93.207.43", typeOrder);

    }

    private void saveChannelPost(List<Position> openList, String uid, boolean pozition) {
        String tradetypr = "closed";
        if(pozition){
            tradetypr = "opened";
        }
        List<ChannelPost> posts=new ArrayList<>();
        for (Position position : openList) {
            String side = "sell";
            if(position.isLong()){
                side = "buy";
            }
            ChannelPost channelPost=new ChannelPost(uid, tradetypr, position.getSymbol(), side, position.getLeverage(), position.getEntryPrice(), position.getMarkPrice(), position.getRoe(), position.getAmount(),position.getPnl());
            posts.add(channelPost);
        }
        channelPostRepository.saveAll(posts);
    }


    private void sendData(List<OpenOrder> order, String ip, String path) {
        System.out.println(ip);
//        history.save(new HistoryOfTrade(ip, path,order.toString(),""));
        String apiUrl = "http://"+ip+":8090/api/v1/order/"+path;
//        String apiUrl = "http://"+"localhost"+":8090/api/v1/order/"+path;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<List<OpenOrder>> requestEntity = new HttpEntity<>(order, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(apiUrl, requestEntity, String.class);
        System.out.println("Response: " + responseEntity.getBody());
    }

    private Response rapidApi(String uid) throws IOException {

        AsyncHttpClient client = Dsl.asyncHttpClient();
        String url = "https://binance-futures-leaderboard1.p.rapidapi.com/v2/getTraderPositions?encryptedUid=" + uid;
        Request request = Dsl.get(url)
//                .setHeader("X-RapidAPI-Key", "66ef117190msh73121a75edac640p1a0584jsn90676298a477")
                .setHeader("X-RapidAPI-Key", "a596618b18msh84307021456fa98p1f4f0bjsn7c7ed590e8ca")
                .setHeader("X-RapidAPI-Host", "binance-futures-leaderboard1.p.rapidapi.com")
                .build();
        ListenableFuture<Response> listenableFuture = client.executeRequest(request, new AsyncCompletionHandler<>() {
            @Override
            public Response onCompleted(Response response) throws Exception {
                return response;
            }
            @Override
            public void onThrowable(Throwable t) {
                t.printStackTrace();
            }
        });
        CompletableFuture<Response> completableFuture = CompletableFuture.supplyAsync(() -> {
            try {
                return listenableFuture.get();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });

        Response response = completableFuture.join();
        System.out.println(response);
        client.close();
        return response;
    }
}