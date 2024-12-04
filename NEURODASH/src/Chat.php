<?php

namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface
{
    protected $clients;
    protected $rooms;

    public function __construct()
    {
        $this->clients = new \SplObjectStorage;
        $this->rooms = [];
        echo "Server started\n";
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $data = json_decode($msg, true);

        if (!$data) {
            return;
        }

        // Handle room joining
        if (isset($data['type']) && $data['type'] === 'join') {
            $room = $data['room'];
            $from->room = $room;

            if (!isset($this->rooms[$room])) {
                $this->rooms[$room] = new \SplObjectStorage();
            }
            $this->rooms[$room]->attach($from);
            return;
        }

        // Handle messaging
        if (isset($data['room'])) {
            $room = $data['room'];

            if (isset($this->rooms[$room])) {
                foreach ($this->rooms[$room] as $client) {
                    if ($from !== $client) {
                        $client->send($msg);
                    }
                }
            }
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);

        // Remove from room if applicable
        if (isset($conn->room) && isset($this->rooms[$conn->room])) {
            $this->rooms[$conn->room]->detach($conn);
        }

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}